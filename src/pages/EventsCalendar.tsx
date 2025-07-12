
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Gift, MapPin } from "lucide-react";

const EventsCalendar = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Events & Calendar</h1>
        <p className="text-teal-100">Fundraisers, qurban drives, bazaars, and institutional events</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-red-600" />
              Upcoming: Qurban 2024
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-2">June 15-17, 2024</p>
            <p className="text-lg font-bold text-green-600">127 participants</p>
            <p className="text-xs text-gray-500">Registration open</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Monthly Bazaar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-2">Every last Saturday</p>
            <p className="text-lg font-bold text-blue-600">45 vendors</p>
            <p className="text-xs text-gray-500">Next: Dec 30, 2024</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-purple-600" />
              Fundraising Event
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-2">January 20, 2025</p>
            <p className="text-lg font-bold text-purple-600">Planning</p>
            <p className="text-xs text-gray-500">Target: Rp 100M</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-12 text-center">
          <Calendar className="h-16 w-16 text-teal-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Event Management System</h3>
          <p className="text-gray-600">Comprehensive event planning and calendar management coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventsCalendar;
