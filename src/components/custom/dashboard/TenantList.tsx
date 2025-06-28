import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { Tenant } from "../../../types/types";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const TenantList = ({
  tenants,
  isLoading,
}: {
  tenants: Tenant[];
  isLoading: boolean;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTenants = tenants.filter((tenant) =>
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Tenant Details</h2>

      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 w-full border border-border rounded-md bg-card text-textPrimary"
      />

      {isLoading ? (
        <p className="text-muted-foreground">Loading tenants...</p>
      ) : filteredTenants.length === 0 ? (
        <p className="text-muted-foreground italic">
          No tenant found for “{searchTerm}”
        </p>
      ) : (
        <Accordion type="single" collapsible className="w-full space-y-2">
          {filteredTenants.map((tenant, index) => (
            <AccordionItem
              key={index}
              value={`tenant-${index}`}
              className="border border-border rounded-md bg-muted px-4"
            >
              <AccordionTrigger className="text-base font-medium py-3">
                {tenant.name}
              </AccordionTrigger>
              <AccordionContent className="text-sm space-y-1 pb-4">
                <p>
                  <strong>Phone:</strong> {tenant.phone}
                </p>
                <p>
                  <strong>Aadhar:</strong> {tenant.aadharNumber}
                </p>
                <p>
                  <strong>Floor:</strong> {tenant.floorNumber}
                </p>
                <p>
                  <strong>Room:</strong> {tenant.roomNumber}
                </p>
                <p>
                  <strong>Bed:</strong> {tenant.bedNumber}
                </p>
                <div className="mt-2">
                  <Zoom>
                    <img
                      src={tenant.documentUrl}
                      alt="Tenant Document"
                      className="w-32 h-auto rounded border cursor-zoom-in"
                    />
                  </Zoom>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default TenantList;
