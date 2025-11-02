"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getPatients } from "@/lib/api";

interface PatientItem {
  id: string;
  fullName?: string;
  full_name?: string;
  uhid?: string;
  email?: string;
  phoneNumber?: string;
}

export default function PatientsList() {
  const router = useRouter();
  const [items, setItems] = useState<PatientItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");

  const fetchData = async (query?: string) => {
    try {
      setLoading(true);
      setError(null);
      const resp = await getPatients(query ? { name: query, uhid: query, page: 1, limit: 20 } : { page: 1, limit: 20 });
      const data = resp.data?.data?.results || [];
      setItems(data);
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to load patients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patients</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <Input placeholder="Search by name or UHID" value={q} onChange={(e) => setQ(e.target.value)} />
          <button className="px-3 py-2 bg-gray-200 rounded" onClick={() => fetchData(q)}>Search</button>
        </div>
        {loading ? (
          <div className="text-sm text-gray-600">Loading...</div>
        ) : error ? (
          <div className="text-sm text-red-600">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>UHID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((p, idx) => (
                  <TableRow key={p.id || idx}>
                    <TableCell>{p.fullName || p.full_name || '—'}</TableCell>
                    <TableCell>{p.uhid || '—'}</TableCell>
                    <TableCell>{(p as any).email || '—'}</TableCell>
                    <TableCell>{p.phoneNumber || (p as any).phone || '—'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button size="sm" variant="outline" onClick={() => router.push(`/dashboard/patients/${p.id}`)}>View</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {items.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-sm text-gray-500">No patients found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
