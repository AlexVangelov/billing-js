export class Catchable {
  _catchCallback :(err: any)=> any;
  catch(catchCallback :(err: any)=> any) {
    this._catchCallback = catchCallback;
  };
  throwAsync(err :any) {
    setTimeout(()=> {
      if (this._catchCallback) this._catchCallback(err);
      else throw err;
    }, 0);
  }
}