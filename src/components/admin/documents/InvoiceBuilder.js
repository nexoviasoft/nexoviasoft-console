"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Printer, Download, Plus, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

export default function InvoiceBuilder({ template, onBack }) {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "INV-2026-001",
    date: new Date().toISOString().split("T")[0],
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    items: [],
  });

  // Pre-fill based on template
  useEffect(() => {
    let initialItem = { description: "General Service", quantity: 1, rate: 100 };
    
    if (template === 'invoice-cloud') {
        initialItem = { description: "Cloud Infrastructure Setup (AWS)", quantity: 1, rate: 1500 };
    } else if (template === 'invoice-web') {
        initialItem = { description: "Frontend Development - React.js", quantity: 40, rate: 50 };
    } else if (template === 'invoice-design') {
        initialItem = { description: "UI/UX Design - Landing Page", quantity: 1, rate: 800 };
    }

    setInvoiceData(prev => ({ ...prev, items: [initialItem] }));
  }, [template]);

  const updateField = (field, value) => {
    setInvoiceData(prev => ({ ...prev, [field]: value }));
  };

  const addItem = () => {
    setInvoiceData(prev => ({
        ...prev,
        items: [...prev.items, { description: "", quantity: 1, rate: 0 }]
    }));
  };

  const removeItem = (index) => {
    setInvoiceData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const updateItem = (index, field, value) => {
    const newItems = [...invoiceData.items];
    newItems[index][field] = value;
    setInvoiceData(prev => ({ ...prev, items: newItems }));
  };

  const calculateTotal = () => {
    return invoiceData.items.reduce((sum, item) => sum + (Number(item.quantity) * Number(item.rate)), 0);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between no-print">
        <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Gallery
        </Button>
        <div className="flex gap-2">
            <Button variant="outline" onClick={() => toast.success("Draft saved!")}>Save Draft</Button>
            <Button onClick={handlePrint} className="bg-purple-600 hover:bg-purple-700 text-white">
                <Printer className="w-4 h-4 mr-2" /> Print PDF
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Form */}
        <Card className="no-print h-fit">
            <CardHeader>
                <CardTitle>Invoice Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Invoice No.</Label>
                        <Input value={invoiceData.invoiceNumber} onChange={(e) => updateField('invoiceNumber', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>Date</Label>
                        <Input type="date" value={invoiceData.date} onChange={(e) => updateField('date', e.target.value)} />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Client Name</Label>
                    <Input placeholder="Company or Person Name" value={invoiceData.clientName} onChange={(e) => updateField('clientName', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>Client Address</Label>
                    <Input placeholder="Billing Address" value={invoiceData.clientAddress} onChange={(e) => updateField('clientAddress', e.target.value)} />
                </div>

                <Separator className="my-4" />
                
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <Label>Line Items</Label>
                        <Button variant="ghost" size="sm" onClick={addItem}><Plus className="w-4 h-4 mr-1"/> Add Item</Button>
                    </div>
                    {invoiceData.items.map((item, idx) => (
                        <div key={idx} className="flex gap-2 items-start">
                             <Input 
                                className="flex-1" 
                                placeholder="Description" 
                                value={item.description} 
                                onChange={(e) => updateItem(idx, 'description', e.target.value)} 
                             />
                             <Input 
                                className="w-20" 
                                type="number" 
                                placeholder="Qty" 
                                value={item.quantity} 
                                onChange={(e) => updateItem(idx, 'quantity', e.target.value)} 
                             />
                             <Input 
                                className="w-24" 
                                type="number" 
                                placeholder="Rate" 
                                value={item.rate} 
                                onChange={(e) => updateItem(idx, 'rate', e.target.value)} 
                             />
                             <Button variant="ghost" size="icon" className="text-red-500" onClick={() => removeItem(idx)}>
                                <Trash2 className="w-4 h-4" />
                             </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

        {/* Live Preview / Printable Area */}
        <div className="bg-white border rounded-lg shadow-sm p-8 min-h-[600px] text-sm print:shadow-none print:border-none print:w-full print:absolute print:top-0 print:left-0 print:z-50 aspect-[1/1.4] mx-auto print:mx-0">
            <div className="flex justify-between items-start mb-12">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">INVOICE</h1>
                    <div className="text-gray-500">#{invoiceData.invoiceNumber}</div>
                </div>
                <div className="text-right">
                    <div className="font-bold text-lg text-purple-600">SquadLog Inc.</div>
                    <div className="text-gray-500 text-xs mt-1">
                        123 Tech Park, Suite 400<br/>
                        San Francisco, CA 94107s
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-12 mb-12">
                <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Billed To:</div>
                    <div className="font-semibold text-gray-900">{invoiceData.clientName || "[Client Name]"}</div>
                    <div className="text-gray-600 whitespace-pre-wrap">{invoiceData.clientAddress || "[Address]"}</div>
                </div>
                <div className="text-right">
                    <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Date:</div>
                    <div className="font-semibold text-gray-900">{invoiceData.date}</div>
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50%]">Item Description</TableHead>
                        <TableHead className="text-right">Qty</TableHead>
                        <TableHead className="text-right">Rate</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoiceData.items.map((item, i) => (
                        <TableRow key={i}>
                            <TableCell>{item.description || "—"}</TableCell>
                            <TableCell className="text-right">{item.quantity}</TableCell>
                            <TableCell className="text-right">${item.rate}</TableCell>
                            <TableCell className="text-right font-medium">
                                ${(Number(item.quantity) * Number(item.rate)).toFixed(2)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex justify-end mt-6 pt-6 border-t">
                <div className="w-1/3 space-y-2">
                    <div className="flex justify-between text-base font-bold">
                        <span>Total:</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                </div>
            </div>
            
            <div className="mt-12 pt-8 border-t text-xs text-gray-400 text-center">
                Thank you for your business. Please process payment within 30 days.
            </div>
        </div>
      </div>
    </div>
  );
}
