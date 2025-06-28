## LIVE PREVIEW

**Zobacz aplikację online:** [https://maciekz23.github.io/WorldInfo/countries](https://maciekz23.github.io/WorldInfo/countries)

# WorldInfoApp 🌍

**WorldInfoApp** to jednostronicowa aplikacja (SPA) napisana w Angularze, która umożliwia szybkie przeglądanie informacji o krajach świata, wyświetlanie ich szczegółów po kliknięciu kraju na mapie oraz wysyłanie wiadomości przez formularz kontaktowy z walidacją. Projekt został zbudowany z użyciem nowoczesnych technologii frontendowych z wykorzystaniem komponentów standalone.

## Opis aplikacji

WorldInfoApp to przeglądarka krajów świata. 
Użytkownik może:
- przeglądać kraje w formie kart z flagą, nazwą, stolicą i regionem,
- wyszukiwać szczegóły kraju (populacja, powierzchnia, waluta, języki, strefa czasowa ) klikając na kartę lub na kraj na interaktywnej mapie,
- korzystać z formularza kontaktowego z walidacją,
- nawigować bez przeładowań strony dzięki zastosowanemu routingowi,
- korzystać z aplikacji na różnych urządzeniach dzięki responsywnemu designowi.

Aplikacja składa się z czterech zakładek, z których każda odpowiada za określoną funkcjonalność:

- Kraje – lista krajów w formie kart z flagą, nazwą, stolicą i regionem. Kliknięcie na kartę przenosi do szczegółów kraju.

- Mapa – interaktywna mapa świata (Leaflet). Kliknięcie na kraj przenosi do jego szczegółów.

- O projekcie – informacje o zastosowanych technologiach, źródłach danych i funkcjonalnościach aplikacji.

- Kontakt – formularz kontaktowy z walidacją (wymagane pola, poprawny email, zgoda na przetwarzanie danych).


Aplikacja jest napisana w Angular 15+ z TypeScript.

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
npm install
```

### Uruchomienie aplikacji
```bash
ng serve
npm run startMobile
```

### Uruchamianie testów
```bash
ng test
```