import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const admins = pgTable("admins", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  firebaseUid: text("firebase_uid").unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAdminSchema = createInsertSchema(admins).pick({
  email: true,
  firebaseUid: true,
});

export type InsertAdmin = z.infer<typeof insertAdminSchema>;
export type Admin = typeof admins.$inferSelect;

export const communityImages = pgTable("community_images", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  imageUrl: text("image_url").notNull(),
  artStyle: text("art_style").notNull(),
  aspectRatio: text("aspect_ratio").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCommunityImageSchema = createInsertSchema(communityImages).pick({
  imageUrl: true,
  artStyle: true,
  aspectRatio: true,
});

export type InsertCommunityImage = z.infer<typeof insertCommunityImageSchema>;
export type CommunityImage = typeof communityImages.$inferSelect;
