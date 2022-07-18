export class RoomModel {
  constructor(
    public id: string,
    public hotel: string,
    public name: string,
    public description: string,
    public price: number,
    public available: boolean,
    public dateAvailable: string
  ) {}
}
