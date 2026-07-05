// ─────────────────────────────────────────────────────────────────────
//  signCgv.ts — Génère un exemplaire signé du PDF des CGV
//
//  Charge le PDF original des CGV, y ajoute une page finale récapitulant
//  l'identité du candidat, la date et l'image de sa signature manuscrite
//  (dessinée sur le canevas de signature), puis renvoie un File prêt à
//  être joint au dossier de candidature.
// ─────────────────────────────────────────────────────────────────────

export const CGV_URL = '/documents/GREEN_UP_ACADEMY_CGV.pdf';

export async function signCgvPdf(opts: {
  fullName: string;
  signatureDataUrl: string;
}): Promise<File> {
  const { PDFDocument, StandardFonts, rgb } = await import('pdf-lib');

  const originalBytes = await fetch(CGV_URL).then(res => {
    if (!res.ok) throw new Error("Impossible de charger le document des CGV.");
    return res.arrayBuffer();
  });

  const pdfDoc = await PDFDocument.load(originalBytes);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const pngImage = await pdfDoc.embedPng(opts.signatureDataUrl);
  const sigDims = pngImage.scale(1);
  const maxSigWidth = 260;
  const sigScale = Math.min(1, maxSigWidth / sigDims.width);
  const sigWidth = sigDims.width * sigScale;
  const sigHeight = sigDims.height * sigScale;

  const page = pdfDoc.addPage([595.32, 841.92]);
  const { width, height } = page.getSize();
  const margin = 60;
  let y = height - 100;

  page.drawText('GREEN UP ACADEMY', { x: margin, y, size: 18, font: fontBold, color: rgb(0.12, 0.67, 0.54) });
  y -= 30;
  page.drawText('Signature électronique des Conditions Générales de Vente et de Formation (CGVF)', {
    x: margin, y, size: 12, font: fontBold, color: rgb(0.17, 0.17, 0.17),
  });
  y -= 40;

  const now = new Date();
  const dateStr = now.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  const lines = [
    `Nom et prénom : ${opts.fullName}`,
    `Date : ${dateStr} à ${timeStr}`,
    `Mention : « Lu et approuvé »`,
  ];
  for (const line of lines) {
    page.drawText(line, { x: margin, y, size: 12, font, color: rgb(0.2, 0.2, 0.2) });
    y -= 22;
  }

  y -= 20;
  page.drawText('Signature :', { x: margin, y, size: 12, font, color: rgb(0.2, 0.2, 0.2) });
  y -= sigHeight + 10;

  page.drawRectangle({
    x: margin, y, width: sigWidth + 20, height: sigHeight + 20,
    borderColor: rgb(0.85, 0.85, 0.85), borderWidth: 1,
  });
  page.drawImage(pngImage, { x: margin + 10, y: y + 10, width: sigWidth, height: sigHeight });

  y -= 30;
  page.drawText(
    "Cette signature a été apposée électroniquement par le candidat sur le formulaire d'admission en ligne de Green Up Academy.",
    { x: margin, y, size: 9, font, color: rgb(0.45, 0.45, 0.45), maxWidth: width - margin * 2 }
  );

  const signedBytes = await pdfDoc.save();
  const blob = new Blob([signedBytes], { type: 'application/pdf' });
  const safeName = opts.fullName.trim().replace(/[^a-zA-Z0-9_-]+/g, '_') || 'candidat';
  return new File([blob], `CGV_signees_${safeName}.pdf`, { type: 'application/pdf' });
}
