export interface Photo {
  url: string;
  description?: string;
}

// By defining the common properties once and intersecting them with a
// discriminated union, we make the type definition more explicit and robust,
// which can resolve complex type-checking errors in some environments.
export type JournalEntry = {
  id: string;
  date: string;
} & (
  | {
      type: 'letter' | 'note';
      content: string;
      revealsPhotos?: string; // ID of the photo entry to reveal
    }
  | {
      type: 'photos';
      items: Photo[];
    }
);
