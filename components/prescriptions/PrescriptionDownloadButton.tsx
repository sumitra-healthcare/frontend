"use client";

import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PrescriptionPDF } from "./PrescriptionPDF";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";

interface PrescriptionDownloadButtonProps {
  fileName: string;
  prescriptionData: any; // Using any for simplicity here to match usage, can be strict typed
}

export const PrescriptionDownloadButton: React.FC<PrescriptionDownloadButtonProps> = ({
  fileName,
  prescriptionData,
}) => {
  return (
    <PDFDownloadLink
      document={<PrescriptionPDF {...prescriptionData} />}
      fileName={fileName}
    >
      {({ loading }) => (
        <Button disabled={loading}>
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Download className="mr-2 h-4 w-4" />
          )}
          {loading ? "Generating..." : "Download PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  );
};

export default PrescriptionDownloadButton;
