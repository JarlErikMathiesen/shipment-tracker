import { readFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

export async function extractPdfText(filePath) {
  try {
    const { PDFParse } = await import('pdf-parse');

    const buffer = await readFile(filePath);

    const parser = new PDFParse({
      data: buffer,
    });

    try {
      const result = await parser.getText();

      if (result.text.trim()) {
        return result.text;
      }
    } finally {
      await parser.destroy();
    }
  } catch (error) {
    console.log('PDF text extraction failed, trying OCR...');
  }

  return extractPdfTextWithOCR(filePath);
}

async function extractPdfTextWithOCR(filePath) {
  const outputPrefix = '/tmp/shipment-tracker-page';

  await execFileAsync('magick', [
    '-density',
    '300',
    filePath,
    `${outputPrefix}-%d.png`,
  ]);

  const { stdout } = await execFileAsync('bash', [
    '-c',
    `for file in ${outputPrefix}-*.png; do tesseract "$file" stdout; done`,
  ]);

  return stdout;
}
