export default class Ore {
  properties: {};
  name: string;
  color: string;
  constructor({
    name,
    color,
    properties,
  }: {
    name: string;
    color: string;
    properties: {};
  }) {
    this.name = name;
    this.color = color;
    this.properties = properties;
  }
}
