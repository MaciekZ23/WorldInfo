# WorldInfoApp 🌍

**WorldInfoApp** to jednostronicowa aplikacja (SPA) napisana w Angularze, która umożliwia szybkie przeglądanie informacji o krajach świata, wyświetlanie ich szczegółów po kliknięciu kraju na mapie oraz wysyłanie wiadomości przez formularz kontaktowy z walidacją. Projekt został zbudowany z użyciem nowoczesnych technologii frontendowych z wykorzystaniem komponentów standalone.


## TECHNOLOGIE

| Technologia              | Zastosowanie                                           |
|--------------------------|--------------------------------------------------------|
| **Angular 15+ (Standalone)** | Główna struktura aplikacji, komponenty bez modułów |
| **TypeScript**           | Silne typowanie i lepsza jakość kodu                   |
| **REST Countries API**    | Źródło danych o krajach                               |
| **Bootstrap 5**           | Stylowanie, układ, responsywność                       |
| **Font Awesome**          | Ikony w interfejsie użytkownika                        |
| **SCSS**                  | Rozszerzone style z wykorzystaniem zmiennych           |
| **Leaflet**               | Interaktywna mapa świata                               |
| **Reactive Forms**        | Dynamiczne formularze z walidacją                      |
| **Jasmine + Karma**       | Testy jednostkowe                                      |


## FUNKCJONALNOŚCI

- Lista krajów w formie kart (flaga, nazwa, stolica, region)

- Szczegóły kraju po kliknięciu (populacja, powierzchnia, waluta, języki)

- Interaktywna mapa (kliknięcie w kraj przenosi do jego szczegółów)

- Dynamiczny formularz kontaktowy z walidacją (wymagane pola, email, zgoda)

- Routing bez przeładowania strony

- Responsywność na urządzeniach mobilnych i desktop

- Testy jednostkowe


## ŹRÓDŁA DANYCH

Dane pochodzą z otwartego API:

[https://restcountries.com/v3.1/all](https://restcountries.com/v3.1/all)


## INSTRUKCJA URUCHOMIENIA

### Klonowanie repozytorium

```bash
git clone https://github.com/MaciekZ23/WorldInfo.git
cd worldinfo-app
```

### Instalacja zależności
```bash
Skopiuj kod
npm install
```

### Uruchomienie aplikacji
```bash
Skopiuj kod
ng serve
Aplikacja będzie dostępna pod adresem: http://localhost:4200/countries
```

### Uruchamianie testów
```bash
Skopiuj kod
ng test
```