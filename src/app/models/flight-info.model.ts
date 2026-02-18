/**
 * Flight information payload for API submission
 * Used to capture and submit arrival details to the backend service
 * 
 * @remarks
 * The comments field is always included in the payload. An empty string
 * is sent if no comment is provided to prevent API processing delays.
 */
export interface FlightInfoPayload {
  /** Airline name or code (e.g., "Delta", "AA") */
  airline: string;
  
  /** Arrival date in ISO 8601 format (YYYY-MM-DD) */
  arrivalDate: string;
  
  /** Arrival time in 24-hour format (HH:MM) */
  arrivalTime: string;
  
  /** Flight number including airline code (e.g., "DL123") */
  flightNumber: string;
  
  /** Number of guests arriving (minimum 1) */
  numOfGuests: number;
  
  /** Optional additional comments or special instructions */
  comments?: string;
}
