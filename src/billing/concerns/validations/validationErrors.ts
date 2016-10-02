export class ValidationErrors extends Array<{ [property :string] :Array<{ [key :string] :string }> }> {
  private _errors :{ [field :string] :Array<{ [key :string] :string }> };

  constructor(modelName :string) {
    super();
  }

  add(property :string, key: string, message: string) {
    let existing = this.findProperty(property);
    if (existing) {
      existing[property][key] = message;
    } else {
      let e = {};
      let m = {};
      m[key] = message;
      e[property] = m;
      this.push(e);
    }
  }

  get messages() {
    let msgs = [];
    this.forEach((e)=> {
      for (let p in e) {
        for (let m in e[p]) {
          msgs.push(`${p[0].toUpperCase()+p.slice(1)} ${e[p][m]}`);
        }
      }
    });
    return msgs;
  }

  private findProperty(property :string) :{ [property :string] :Array<{ [key :string] :string }> } {
    for (let e in this) {
      if (this[e][property]) return this[e];
    }
  }
}