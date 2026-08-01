export interface TextChunk {

    chunkId: number;

    content: string;

}

export const splitIntoChunks = (

    text: string,

    chunkSize = 1000,

    overlap = 200

): TextChunk[] => {

    const chunks: TextChunk[] = [];

    let start = 0;

    let index = 0;

    while (start < text.length) {

        const end = Math.min(

            start + chunkSize,

            text.length

        );

        chunks.push({

            chunkId: index,

            content: text.substring(start, end)

        });

        start += chunkSize - overlap;

        index++;

    }
    return chunks;
};