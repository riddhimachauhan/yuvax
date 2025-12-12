export interface CreateZoneRequest {
  name: string;
  gmtOffset: string;
  primeTimeStart: string;
  primeTimeEnd: string;
}

export interface UpdateZoneRequest {
  name?: string;
  gmtOffset?: string;
  primeTimeStart?: string;
  primeTimeEnd?: string;
}
