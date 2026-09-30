export interface PersonPNR {
  passport_number?: string;
  itinerary_profile?: string;
  travel_frequency?: string;
  emergency_contact?: PNREmergencyContact;
}

interface PNREmergencyContact {
  name?: string;
  phone?: string;
}
