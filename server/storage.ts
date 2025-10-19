import type { Admin, InsertAdmin, CommunityImage, InsertCommunityImage } from "@shared/schema";
import { admins, communityImages } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getAdminByEmail(email: string): Promise<Admin | undefined>;
  getAdminByFirebaseUid(firebaseUid: string): Promise<Admin | undefined>;
  createAdmin(admin: InsertAdmin): Promise<Admin>;
  getAllCommunityImages(): Promise<CommunityImage[]>;
  createCommunityImage(image: InsertCommunityImage): Promise<CommunityImage>;
  deleteCommunityImage(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getAdminByEmail(email: string): Promise<Admin | undefined> {
    if (!db) return undefined;
    const [admin] = await db.select().from(admins).where(eq(admins.email, email));
    return admin || undefined;
  }

  async getAdminByFirebaseUid(firebaseUid: string): Promise<Admin | undefined> {
    if (!db) return undefined;
    const [admin] = await db.select().from(admins).where(eq(admins.firebaseUid, firebaseUid));
    return admin || undefined;
  }

  async createAdmin(insertAdmin: InsertAdmin): Promise<Admin> {
    if (!db) throw new Error("Database not available");
    const [admin] = await db
      .insert(admins)
      .values(insertAdmin)
      .returning();
    return admin;
  }

  async getAllCommunityImages(): Promise<CommunityImage[]> {
    if (!db) return [];
    const images = await db.select().from(communityImages);
    return images;
  }

  async createCommunityImage(image: InsertCommunityImage): Promise<CommunityImage> {
    if (!db) throw new Error("Database not available");
    const [newImage] = await db
      .insert(communityImages)
      .values(image)
      .returning();
    return newImage;
  }

  async deleteCommunityImage(id: string): Promise<void> {
    if (!db) throw new Error("Database not available");
    await db.delete(communityImages).where(eq(communityImages.id, id));
  }
}

export class InMemoryStorage implements IStorage {
  private admins: Admin[] = [];
  private communityImages: CommunityImage[] = [];

  async getAdminByEmail(email: string): Promise<Admin | undefined> {
    return this.admins.find(a => a.email === email);
  }

  async getAdminByFirebaseUid(firebaseUid: string): Promise<Admin | undefined> {
    return this.admins.find(a => a.firebaseUid === firebaseUid);
  }

  async createAdmin(insertAdmin: InsertAdmin): Promise<Admin> {
    const admin: Admin = {
      id: `admin-${Date.now()}`,
      email: insertAdmin.email,
      firebaseUid: insertAdmin.firebaseUid || null,
      createdAt: new Date(),
    };
    this.admins.push(admin);
    return admin;
  }

  async getAllCommunityImages(): Promise<CommunityImage[]> {
    return this.communityImages;
  }

  async createCommunityImage(image: InsertCommunityImage): Promise<CommunityImage> {
    const newImage: CommunityImage = {
      id: `img-${Date.now()}`,
      imageUrl: image.imageUrl,
      artStyle: image.artStyle,
      aspectRatio: image.aspectRatio,
      createdAt: new Date(),
    };
    this.communityImages.push(newImage);
    return newImage;
  }

  async deleteCommunityImage(id: string): Promise<void> {
    this.communityImages = this.communityImages.filter(img => img.id !== id);
  }
}

export const storage: IStorage = db ? new DatabaseStorage() : new InMemoryStorage();
