import mongoose from "mongoose";

/**
 * Connects to MongoDB if MONGODB_URI is set. Deliberately non-fatal when
 * it isn't — this lets the API skeleton run and be reviewed before a
 * database is provisioned. Once real data models exist (post MVP-boundary
 * spec), routes that need persistence should check mongoose.connection
 * readyState and fail loudly rather than silently no-op.
 */
export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn(
      "[db] MONGODB_URI not set — starting without a database connection."
    );
    return null;
  }

  try {
    await mongoose.connect(uri);
    console.log("[db] Connected to MongoDB");
    return mongoose.connection;
  } catch (err) {
    console.error("[db] Failed to connect to MongoDB:", err.message);
    // Non-fatal by design at this stage of the build. Revisit once the
    // API actually depends on persisted data.
    return null;
  }
}
