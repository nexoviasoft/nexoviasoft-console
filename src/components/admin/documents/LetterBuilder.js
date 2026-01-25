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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
        <Button
          variant="ghost"
          onClick={onBack}
          className="gap-2 text-white/80 hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Gallery
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => toast.success("Draft saved!")}
            className="glass-button border-white/30 text-white hover:bg-white/10"
          >
            Save Draft
          </Button>
          <Button
            onClick={handlePrint}
            className="bg-[#EFFC76] hover:bg-[#dbe665] text-black shadow-[0_0_15px_rgba(239,252,118,0.3)] transition-all duration-300"
          >
            <Printer className="w-4 h-4 mr-2" /> Print PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Form */}
        <Card className="no-print h-fit glass-card border-white/10">
            <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  Letter Details
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-white/80">Candidate Name</Label>
                    <Input
                      placeholder="John Doe"
                      value={data.candidateName}
                      onChange={(e) => updateField('candidateName', e.target.value)}
                      className="bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-white/80">Role / Designation</Label>
                        <Input
                          placeholder="Senior Developer"
                          value={data.role}
                          onChange={(e) => updateField('role', e.target.value)}
                          className="bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-white/80">Start Date</Label>
                        <Input
                          type="date"
                          value={data.startDate}
                          onChange={(e) => updateField('startDate', e.target.value)}
                          className="bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label className="text-white/80">Annual CTC / Salary</Label>
                    <Input
                      placeholder="$120,000"
                      value={data.salary}
                      onChange={(e) => updateField('salary', e.target.value)}
                      className="bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-white/80">Reporting Manager</Label>
                    <Input
                      placeholder="Manager Name"
                      value={data.manager}
                      onChange={(e) => updateField('manager', e.target.value)}
                      className="bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                    />
                </div>
           </CardContent>
        </Card>

        {/* Live Preview */}
        <div className="glass-card border-white/20 rounded-lg p-6 md:p-12 min-h-[500px] md:min-h-[600px] text-sm text-white print:shadow-none print:border-none print:w-full print:absolute print:top-0 print:left-0 print:z-50 w-full mx-auto print:mx-0 font-serif leading-relaxed overflow-x-auto">
            
            <div className="min-w-[600px] md:min-w-0">
                {/* Header */}
                <div className="text-center mb-8 border-b border-white/20 pb-6">
                    <div className="text-2xl font-bold text-[#EFFC76] tracking-widest mb-2">SQUADLOG INC.</div>
                    <div className="text-xs text-white/60 tracking-wide">
                        123 Tech Park • San Francisco, CA • www.squadlog.com
                    </div>
                </div>

                <div className="mb-8">
                    <div className="font-bold text-white">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    <br/>
                    <div className="text-white/80">To,</div>
                    <div className="font-bold text-white">{data.candidateName || "[Candidate Name]"}</div>
                    <div className="text-white/80">[Address Line 1]</div>
                    <div className="text-white/80">[City, State, Zip]</div>
                </div>

                <div className="text-center font-bold underline mb-8 uppercase tracking-wider text-base text-[#EFFC76]">
                    {getLetterTitle()}
                </div>

                <div className="space-y-4 text-justify text-white/90">
                    <p>Dear <strong className="text-white">{data.candidateName || "[Candidate Name]"}</strong>,</p>

                    {template === 'offer-letter' && (
                        <>
                            <p>
                                We are pleased to extend an offer for you to join <strong className="text-white">SquadLog Inc.</strong> in the position of <strong className="text-white">{data.role || "[Role]"}</strong>. 
                                We were impressed with your skills and experience and believe you will be a valuable asset to our team.
                            </p>
                            <p>
                                Your starting annual salary will be <strong className="text-white">{data.salary || "[Salary]"}</strong>, along with our standard benefits package. 
                                You will be reporting to <strong className="text-white">{data.manager || "[Manager Name]"}</strong>.
                            </p>
                        </>
                    )}

                    {template === 'appointment-letter' && (
                        <>
                            <p>
                                Further to our recent discussions and your acceptance of our offer, we are delighted to confirm your appointment as <strong className="text-white">{data.role || "[Role]"}</strong> at <strong className="text-white">SquadLog Inc.</strong>, effective from <strong className="text-white">{data.startDate}</strong>.
                            </p>
                            <p>
                                Your annual compensation package is fixed at <strong className="text-white">{data.salary || "[Salary]"}</strong>. 
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
                            <div className="border-t border-white/20 w-3/4 pt-2 font-bold text-white">Authorized Signatory</div>
                            <div className="text-white/80">SquadLog Inc.</div>
                        </div>
                        <div>
                            <div className="border-t border-white/20 w-3/4 pt-2 font-bold text-white">Employee Signature</div>
                            <div className="text-white/80">Date: _________________</div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
      </div>
    </div>
  );
}
