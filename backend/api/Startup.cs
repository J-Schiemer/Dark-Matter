namespace api;

public static class Startup
{
    /// <summary>
    /// Configure the app services
    /// </summary>
    /// <param name="services">the services to configure</param>
    public static void ConfigureServices(this IServiceCollection services)
    {
        services.AddControllers();
        services.AddOpenApiDocument(document =>
        {
            document.Title = "Dark-Matter API";
            document.Version = "v1";
            document.Description = "Dark-Matter API - API for the Dark-Matter Homepage framework.";
        });
    }
}