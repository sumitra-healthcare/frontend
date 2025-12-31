"use client";

import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { PrescriptionPDF } from "@/components/prescriptions/PrescriptionPDF";

interface PrescriptionPreviewProps {
  prescriptionData: any;
  width?: string | number;
  height?: string | number;
  showToolbar?: boolean;
}

export const PrescriptionPreview: React.FC<PrescriptionPreviewProps> = ({
  prescriptionData,
  width = "100%",
  height = "100%",
  showToolbar = true,
}) => {
  return (
    <PDFViewer width={width} height={height} showToolbar={showToolbar}>
      <PrescriptionPDF {...prescriptionData} />
    </PDFViewer>
  );
};

export default PrescriptionPreview;
