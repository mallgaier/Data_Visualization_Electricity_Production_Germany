import {Component, Input, OnInit} from "@angular/core";
import * as Highcharts from 'highcharts';
import {EnumService, Month, Year} from '../service/enum.service';
import {CsvService} from "../service/csv.service";
import {ColorService} from "../service/color.service";

@Component({
  selector: 'chart-small-grouped',
  templateUrl: './chart-small-grouped.component.html',
})
export class ChartSmallGroupedComponent implements OnInit{

  // Chart
  highchartSmallGrouped: typeof Highcharts = Highcharts;
  @Input() public updateFlagSmallGrouped = false;
  public chartRef!: Highcharts.Chart;
  @Input() public displayMonth = Month as any;
  @Input() public displayYear = Year as any;

  constructor(private csvService: CsvService, public enumService: EnumService, public colorService: ColorService) {
  }

  ngOnInit() {
    this.updateSmallGroupedChart();
  }

  chartOptionsSmallGrouped: any = {
    chart: {
      type: 'column',
    },
    xAxis: {
      categories:[],
      // categories: ['Hydro Pumped Storage', 'Photovoltaics', 'Wind Offshore', 'Wind Onshore', 'Biomass',
      // 'HydroPower', 'other Renewables', 'Fossil Gas', 'Nuclear', 'Brown Coal', 'Hard Coal', 'other Conventional',]

    },
    yAxis: {
      title: {
        text: 'MWh'
      },
    },
    title: {
      text: '',
    },
    tooltip: {
      shared: true,
      headerFormat: '<span style="font-size:12px"><b>{point.key}</b></span><br>',
    },
    legend: {enabled: false},
    plotOptions: {
      series: {
        dataSorting: {
          enabled: true,
          matchByName: true
        },
        dataLabels: {
          enabled: true,
          formatter: function (): any {
            // @ts-ignore
            var pcnt = (this.y / this.series.data.map(p => p.y).reduce((a, b) => a + b, 0)) * 100;
            // @ts-ignore
            return Highcharts.numberFormat(pcnt) + '%';
          }
        }
      }
    },
    series: {},
  };

  updateSmallGroupedChart() {
    this.chartOptionsSmallGrouped.series = [{
      name: 'Sum: ',
      data: [{
        name: 'Hydro Power (combined)',
        color: this.colorService.hydroPumpedStorage,
        y: this.csvService.sumHydroPowerAggregated
      }, {
        name: 'Photovoltaics',
        color: this.colorService.photovoltaics,
        y: this.csvService.photovoltaicsAggregated
      }, {
        name: 'Wind',
        color: this.colorService.windOffshore,
        y: this.csvService.sumWindAggregated
      }, {
        name: 'Biomass',
        color: this.colorService.biomass,
        y: this.csvService.biomassAggregated
      }, {
        name: 'Fossil Gas',
        color: this.colorService.fossilGas,
        y: this.csvService.fossilGasAggregated
      }, {
        name: 'Nuclear',
        color: this.colorService.nuclear,
        y: this.csvService.nuclearAggregated
      }, {
        name: 'Coal',
        color: this.colorService.brownCoal,
        y: this.csvService.sumCoalAggregated
      }, {
        name: 'Other',
        color: this.colorService.other,
        y: this.csvService.otherAggregated
      }]
    }]

    this.updateFlagSmallGrouped = true;
  }
}