export interface ParsedDocument {
    text: string;
    pageCount?: number;
    metadata?: Record<string,any>;
}