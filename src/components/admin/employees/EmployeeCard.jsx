"use client";

import React from "react";
import { Mail, Phone, MapPin, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function EmployeeCard({ employee }) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 group relative overflow-hidden border-gray-100">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <CardContent className="p-6">
        <div className="absolute top-4 right-4 text-gray-300 hover:text-gray-600 cursor-pointer">
          <MoreHorizontal className="w-5 h-5" />
        </div>

        <div className="flex flex-col items-center text-center">
          <Avatar className="w-24 h-24 border-4 border-white shadow-sm mb-4">
            <AvatarImage src={employee.avatar} />
            <AvatarFallback>{employee.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
          </Avatar>
          
          <h3 className="font-bold text-gray-900 text-lg mb-1">{employee.name}</h3>
          <p className="text-purple-600 font-medium text-sm mb-3">{employee.role}</p>
          
          <Badge variant="secondary" className="mb-6 bg-gray-100 text-gray-600 hover:bg-gray-200">
            {employee.department}
          </Badge>

          <div className="flex items-center justify-center gap-3 w-full border-t border-gray-100 pt-6">
             <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-gray-400 hover:text-purple-600 hover:bg-purple-50">
               <Mail className="w-4 h-4" />
             </Button>
             <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-gray-400 hover:text-green-600 hover:bg-green-50">
               <Phone className="w-4 h-4" />
             </Button>
             <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50">
               <MapPin className="w-4 h-4" />
             </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
