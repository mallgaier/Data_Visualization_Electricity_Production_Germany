import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class ColourService {
  // Change the HEX-Value of the colours here

  // Used for the detailed chart
  public hydroPumpedStorage =  '#058DC7';
  public photovoltaics =  '#50B432';
  public windOffshore =  '#ED561B';
  public windOnshore =  '#DDDF00';
  public biomass =  '#24CBE5';
  public hydroPower =  '#64E572';
  public otherRenewables =  '#FF9655';
  public fossilGas =  '#FFF263';
  public nuclear =  '#6AF9C4';
  public brownCoal =  '#058DC7';
  public hardCoal =  '#50B432';
  public otherConventional =  '#ED561B';

  // Used for the summarization chart
  public sumRenewables =  '#66c2a5';
  public sumConventional =  '#8da0cb';
    public totalDemand =  '#fc8d62'

}
