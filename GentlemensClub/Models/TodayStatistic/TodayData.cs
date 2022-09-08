using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace GentlemensClub.Models.TodayStatistic;

public class TodayData
{
    public string? Ticker { get; set; }
    public string? Name { get; set; }
    public string? Exchange_Short { get; set; }
    public string? Exchange_Long { get; set; }
    public string? Mic_Code { get; set; }
    public string? Currency { get; set; }
    public float? Price { get; set; }
    public float? Day_High { get; set; }
    public float? Day_Low { get; set; }
    public float? Day_Open { get; set; }

    //[Column("52_Week_High")]
    //public float Week_High { get; set; }

    //[JsonPropertyName("52_week_low")]
    //public float WeekLow { get; set; }
    public ulong? Market_Cap { get; set; }
    public float? Previous_Close_Price { get; set; }
    public DateTime? Previous_Close_Price_Time { get; set; }
    public float? Day_Change { get; set; }
    public ulong? Volume { get; set; }
    public DateTime? Last_Trade_Time { get; set; }
}