"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Printer } from "lucide-react";
import { toast } from "sonner";

export default function LetterBuilder({ template, onBack }) {
  const [data, setData] = useState({
    candidateName: "",
    role: "",
    startDate: new Date().toISOString().split("T")[0],
    salary: "",
    manager: "",
    customMessage: ""
  });

  const updateField = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handlePrint = () => {
    window.print();
  };

  const getLetterTitle = () => {
      if (template === 'offer-letter') return "JOB OFFER LETTER";
      if (template === 'appointment-letter') return "LETTER OF APPOINTMENT";
      return "OFFICIAL LETTER";
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
                <CardTitle>Letter Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Candidate Name</Label>
                    <Input placeholder="John Doe" value={data.candidateName} onChange={(e) => updateField('candidateName', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Role / Designation</Label>
                        <Input placeholder="Senior Developer" value={data.role} onChange={(e) => updateField('role', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input type="date" value={data.startDate} onChange={(e) => updateField('startDate', e.target.value)} />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Annual CTC / Salary</Label>
                    <Input placeholder="$120,000" value={data.salary} onChange={(e) => updateField('salary', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>Reporting Manager</Label>
                    <Input placeholder="Manager Name" value={data.manager} onChange={(e) => updateField('manager', e.target.value)} />
                </div>
           </CardContent>
        </Card>

        {/* Live Preview */}
        <div className="bg-white border rounded-lg shadow-sm p-12 min-h-[600px] text-sm print:shadow-none print:border-none print:w-full print:absolute print:top-0 print:left-0 print:z-50 aspect-[1/1.4] mx-auto print:mx-0 font-serif leading-relaxed text-gray-800">
            
            {/* Header */}
            <div className="text-center mb-8 border-b pb-6">
                <div className="text-2xl font-bold text-gray-900 tracking-widest mb-2">SQUADLOG INC.</div>
                <div className="text-xs text-gray-500 tracking-wide">
                    123 Tech Park • San Francisco, CA • www.squadlog.com
                </div>
            </div>

            <div className="mb-8">
                <div className="font-bold">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                <br/>
                <div>To,</div>
                <div className="font-bold">{data.candidateName || "[Candidate Name]"}</div>
                <div>[Address Line 1]</div>
                <div>[City, State, Zip]</div>
            </div>

            <div className="text-center font-bold underline mb-8 uppercase tracking-wider text-base">
                {getLetterTitle()}
            </div>

            <div className="space-y-4 text-justify">
                <p>Dear <strong>{data.candidateName || "[Candidate Name]"}</strong>,</p>

                {template === 'offer-letter' && (
                    <>
                        <p>
                            We are pleased to extend an offer for you to join <strong>SquadLog Inc.</strong> in the position of <strong>{data.role || "[Role]"}</strong>. 
                            We were impressed with your skills and experience and believe you will be a valuable asset to our team.
                        </p>
                        <p>
                            Your starting annual salary will be <strong>{data.salary || "[Salary]"}</strong>, along with our standard benefits package. 
                            You will be reporting to <strong>{data.manager || "[Manager Name]"}</strong>.
                        </p>
                    </>
                )}

                {template === 'appointment-letter' && (
                    <>
                        <p>
                            Further to our recent discussions and your acceptance of our offer, we are delighted to confirm your appointment as <strong>{data.role || "[Role]"}</strong> at <strong>SquadLog Inc.</strong>, effective from <strong>{data.startDate}</strong>.
                        </p>
                        <p>
                            Your annual compensation package is fixed at <strong>{data.salary || "[Salary]"}</strong>. 
                            The terms and conditions of your employment are outlined in the attached Employee Handbook.
                        </p>
                    </>
                )}

                <p>
                    We look forward to welcoming you to the SquadLog family. Please sign and return a copy of this letter to acknowledge your acceptance.
                </p>
            </div>

            <div className="mt-16">
                <div className="grid grid-cols-2 gap-12">
                    <div>
                        <div className="border-t border-gray-900 w-3/4 pt-2 font-bold">Authorized Signatory</div>
                        <div>SquadLog Inc.</div>
                    </div>
                    <div>
                        <div className="border-t border-gray-900 w-3/4 pt-2 font-bold">Employee Signature</div>
                        <div>Date: _________________</div>
                    </div>
                </div>
            </div>
            
        </div>
      </div>
    </div>
  );
}
