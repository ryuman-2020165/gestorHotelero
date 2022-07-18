export class EventModel {
  constructor(
    public id: string,
    public hotel: string,
    public name: string,
    public description: string,
    public category: string,
    public dateEvent: Date
  ) {}
}
