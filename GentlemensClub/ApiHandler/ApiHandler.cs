using System.Text.Json;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace GentlemensClub.ApiHandler;

public class ApiHandler
{
    public async Task<T> GetDataByUrl<T>(string apiURL)
    {
        using (HttpClient client = new HttpClient())
        {
            client.BaseAddress = new Uri(apiURL);
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = await client.GetAsync(apiURL);
            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                var statistics = JsonConvert.DeserializeObject<T>(data);
                return statistics;
            }
        }

        throw new NotImplementedException();
    }
}