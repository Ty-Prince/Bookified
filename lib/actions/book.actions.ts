'use server'

import { connectToDatabase } from "@/database/mongoose";
import { CreateBook, TextSegment } from "@/types";
import { genrateslug, serializedata } from "@/lib/utils";
import Book from "@/database/models/book.model";
import BookSegment from "@/database/models/bookSegment.model";

export const checkBookExists = async (title: string) => {
    try {
        await connectToDatabase();

        const slug = genrateslug(title);
        const existingBook = await Book.findOne({ slug });

        if (existingBook) {
            return {
                exist: true,
                data: serializedata(existingBook)
            }
        }
        else {
            return {
                exist: false,
            }
        }
    } catch (e) {
        console.error("Error checking book exist:", e);
        return { exist: false, error: e };
    }
}

export const createbook = async (data: CreateBook) => {
    try {
        await connectToDatabase();

        const slug = genrateslug(data.title);

        const existingBook = await Book.findOne({ slug });

        if (existingBook) {
            return {
                success: true,
                data: serializedata(existingBook),
                alreadyExists: true,
            }
        }

        // Todo : check subscription limits before creating book

        const book = await Book.create({ ...data, slug, totalSegments: 0 });

        return {
            success: true,
            data: serializedata(book),
            alreadyExists: false,
        }

    } catch (error) {
        console.error("Database connection error:", error);
        return { success: false, message: "Database connection failed" };

    }


};

export const saveBookSegments = async (bookId: string, clerkId: string, segments: TextSegment[]) => {
    try {

        await connectToDatabase();

        const segmentToInsert = segments.map((segment) => ({
            clerkId,
            bookId,
            content: segment.text,
            segmentIndex: segment.segmentIndex,
            pageNumber: (segment as any).pageNumber,
            wordCount: segment.wordCount,
        }));

        await BookSegment.insertMany(segmentToInsert);
        await Book.findByIdAndUpdate(bookId, { totalSegments: segments.length });

        console.log('Book segments saved successfully')

        return { success: true, data: { SegmentCreated: segments.length } };
    } catch (error) {
        console.error("Error saving book segments:", error);

        await BookSegment.deleteMany({ bookId })
        await Book.findByIdAndDelete(bookId);

        return { success: false, message: "Failed to save book segments" };
    }

};