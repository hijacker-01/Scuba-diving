export interface BookingData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export async function insertBooking(db: any, data: BookingData) {
  return { id: Date.now(), ...data, createdAt: new Date() };
}
