FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["ContactList.WebApi/ContactList.WebApi.csproj", "ContactList.WebApi/"]
COPY ["ContactList.Domain/ContactList.Domain.csproj", "Domain/"]
COPY ["ContactList.Infraestructure/ContactList.Infraestructure.csproj", "Infraestructure/"]
RUN dotnet restore "ContactList.WebApi/ContactList.WebApi.csproj"
COPY . .
WORKDIR "/src/ContactList.WebApi"
RUN dotnet build "ContactList.WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ContactList.WebApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
RUN apt update && apt install -y curl
ENTRYPOINT ["dotnet", "ContactList.WebApi.dll"]
