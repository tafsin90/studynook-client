diff --git a/index.js b/index.js
index ee07a13..2886c6c 100644
--- a/index.js
+++ b/index.js
@@ -15,6 +15,16 @@ app.use(express.json());
 
 const client = new MongoClient(process.env.MONGODB_URI);
 
+// Safely build an ObjectId from a route/query param - returns null instead
+// of throwing on a malformed id.
+const toObjectId = (id) => {
+  try {
+    return new ObjectId(id);
+  } catch {
+    return null;
+  }
+};
+
 async function connectToMongoDB() {
   try {
     await client.connect();
@@ -22,6 +32,7 @@ async function connectToMongoDB() {
 
     const db = client.db("StudyNook");
     const roomCollection = db.collection("rooms");
+    const bookingCollection = db.collection("bookings");
 
     app.get("/", async (req, res) => {
       const result = await roomCollection
@@ -32,22 +43,185 @@ async function connectToMongoDB() {
 
       res.send(result);
     });
+
+    // GET /rooms                     -> every room
+    // GET /rooms?createdBy=<userId>  -> only rooms created by that user (My Listings)
     app.get("/rooms", async (req, res) => {
-      const result = await roomCollection.find().toArray();
+      const { createdBy } = req.query;
+      const query = createdBy ? { createdBy } : {};
+
+      const result = await roomCollection.find(query).sort({ _id: -1 }).toArray();
+
       res.send(result);
     });
 
     app.get("/rooms/:id", async (req, res) => {
       const { id } = req.params;
-      const result = await roomCollection.findOne({
-        _id: new ObjectId(id),
-      });
-      res.send(result)
+      const _id = toObjectId(id);
+      if (!_id) return res.status(400).send({ message: "Invalid room id" });
+
+      const result = await roomCollection.findOne({ _id });
+      if (!result) return res.status(404).send({ message: "Room not found" });
+
+      res.send(result);
     });
 
     app.post("/add-room", async (req, res) => {
       const addedRoomData = req.body;
-      const result = await roomCollection.insertOne(addedRoomData);
+
+      if (!addedRoomData.createdBy) {
+        return res
+          .status(401)
+          .send({ message: "You must be logged in to add a room" });
+      }
+
+      const room = {
+        ...addedRoomData,
+        createdAt: new Date(),
+      };
+
+      const result = await roomCollection.insertOne(room);
+      res.send(result);
+    });
+
+    // PUT /rooms/:id -> edit a room. Only the room's creator may edit it.
+    // Body must include `userId` (the requester's id) for the ownership check.
+    app.put("/rooms/:id", async (req, res) => {
+      const { id } = req.params;
+      const _id = toObjectId(id);
+      if (!_id) return res.status(400).send({ message: "Invalid room id" });
+
+      const { userId, ...updatedFields } = req.body;
+
+      const room = await roomCollection.findOne({ _id });
+      if (!room) return res.status(404).send({ message: "Room not found" });
+
+      if (!userId || room.createdBy !== userId) {
+        return res
+          .status(403)
+          .send({ message: "You can only edit rooms you created" });
+      }
+
+      // Never let an edit payload change who owns the room.
+      delete updatedFields.createdBy;
+      delete updatedFields.createdByName;
+      delete updatedFields.createdByEmail;
+      delete updatedFields._id;
+
+      const result = await roomCollection.updateOne(
+        { _id },
+        { $set: { ...updatedFields, updatedAt: new Date() } },
+      );
+
+      res.send(result);
+    });
+
+    // DELETE /rooms/:id?userId=<ownerId> -> delete a room. Only the creator
+    // may delete it. Any bookings made for the room are cleaned up too.
+    app.delete("/rooms/:id", async (req, res) => {
+      const { id } = req.params;
+      const { userId } = req.query;
+      const _id = toObjectId(id);
+      if (!_id) return res.status(400).send({ message: "Invalid room id" });
+
+      const room = await roomCollection.findOne({ _id });
+      if (!room) return res.status(404).send({ message: "Room not found" });
+
+      if (!userId || room.createdBy !== userId) {
+        return res
+          .status(403)
+          .send({ message: "You can only delete rooms you created" });
+      }
+
+      const result = await roomCollection.deleteOne({ _id });
+      await bookingCollection.deleteMany({ roomId: id });
+
+      res.send(result);
+    });
+
+    // ----- Bookings -----
+
+    // POST /bookings -> book a room. A user cannot book their own room.
+    app.post("/bookings", async (req, res) => {
+      const {
+        roomId,
+        bookedBy,
+        bookedByName,
+        bookedByEmail,
+        date,
+        startTime,
+        duration,
+      } = req.body;
+
+      if (!bookedBy) {
+        return res
+          .status(401)
+          .send({ message: "You must be logged in to book a room" });
+      }
+
+      const _id = toObjectId(roomId);
+      if (!_id) return res.status(400).send({ message: "Invalid room id" });
+
+      const room = await roomCollection.findOne({ _id });
+      if (!room) return res.status(404).send({ message: "Room not found" });
+
+      if (room.createdBy === bookedBy) {
+        return res
+          .status(403)
+          .send({ message: "You cannot book your own room" });
+      }
+
+      const hours = Number(duration) || 1;
+
+      const booking = {
+        roomId,
+        roomName: room.roomName,
+        roomImageUrl: room.roomImageUrl,
+        floor: room.floor,
+        hourlyRate: room.hourlyRate,
+        bookedBy,
+        bookedByName,
+        bookedByEmail,
+        date,
+        startTime,
+        duration: hours,
+        totalPrice: hours * room.hourlyRate,
+        status: "confirmed",
+        createdAt: new Date(),
+      };
+
+      const result = await bookingCollection.insertOne(booking);
+      res.send(result);
+    });
+
+    // GET /bookings?user=<userId> -> a user's own bookings (My Bookings)
+    app.get("/bookings", async (req, res) => {
+      const { user } = req.query;
+      const query = user ? { bookedBy: user } : {};
+
+      const result = await bookingCollection.find(query).sort({ _id: -1 }).toArray();
+
+      res.send(result);
+    });
+
+    // DELETE /bookings/:id?userId=<bookerId> -> cancel a booking. Only the
+    // person who made the booking may cancel it.
+    app.delete("/bookings/:id", async (req, res) => {
+      const { id } = req.params;
+      const { userId } = req.query;
+      const _id = toObjectId(id);
+      if (!_id) return res.status(400).send({ message: "Invalid booking id" });
+
+      const booking = await bookingCollection.findOne({ _id });
+      if (!booking) return res.status(404).send({ message: "Booking not found" });
+
+      if (!userId || booking.bookedBy !== userId) {
+        return res
+          .status(403)
+          .send({ message: "You can only cancel your own bookings" });
+      }
+
+      const result = await bookingCollection.deleteOne({ _id });
       res.send(result);
     });
 
@@ -63,9 +237,6 @@ async function connectToMongoDB() {
 // }
 
 connectToMongoDB();
-// app.get('/', (req, res) => {
-//   res.send('StudyNook Server is running...!')
-// })
 
 app.listen(port, () => {
   console.log(`app listening on port ${port}`);