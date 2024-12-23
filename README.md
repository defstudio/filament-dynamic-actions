![Filament Dynamic Actions](https://banners.beyondco.de/Filament%20Dynamic%20Actions.png?theme=light&packageManager=composer+require&packageName=defstudio%2Ffilament-dynamic-actions&pattern=architect&style=style_1&description=Auto+disable+actions+in+dirty+forms&md=1&showWatermark=1&fontSize=100px&images=refresh)

# 

<a href="https://packagist.org/packages/defstudio/filament-dynamic-actions" target="_blank"><img style="display: inline-block; margin-top: 0.5em; margin-bottom: 0.5em" src="https://img.shields.io/packagist/v/defstudio/filament-dynamic-actions.svg?style=flat&cacheSeconds=3600" alt="Latest Version on Packagist"></a>
<a href="https://github.com/defstudio/filament-dynamic-actions/actions?query=workflow%3Alint+branch%3Amain" target="_blank"><img style="display: inline-block; margin-top: 0.5em; margin-bottom: 0.5em" src="https://img.shields.io/github/actions/workflow/status/defstudio/filament-dynamic-actions/fix-php-code-styling.yml?branch=main&label=code%20style&cacheSeconds=3600" alt="Code Style"></a>
<a href="https://packagist.org/packages/defstudio/filament-dynamic-actions" target="_blank"><img style="display: inline-block; margin-top: 0.5em; margin-bottom: 0.5em" src="https://img.shields.io/packagist/dt/defstudio/filament-dynamic-actions.svg?style=flat&cacheSeconds=3600" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/defstudio/filament-dynamic-actions" target="_blank"><img style="display: inline-block; margin-top: 0.5em; margin-bottom: 0.5em" src="https://img.shields.io/packagist/l/defstudio/filament-dynamic-actions?style=flat&cacheSeconds=3600" alt="License"></a>
<a href="https://twitter.com/FabioIvona?ref_src=twsrc%5Etfw" target="_blank"><img style="display: inline-block; margin-top: 0.5em; margin-bottom: 0.5em" alt="Twitter Follow" src="https://img.shields.io/twitter/follow/FabioIvona?label=Follow&style=social"></a>


Want to enable/disable a Filament action when the form is dirty/unsaved? With this package, it will be as easy as:

```php
    \Filament\Actions\Action::make('download')
            ->icon('heroicon-o-document-arrow-down')
            ->action(function($record){...})
             ->disabledWhenDirty()
```

all with Alpine, no need of extra livewire requests to the backend 

## Installation

You can install the package via composer:

```bash
composer require defstudio/filament-dynamic-actions
```

You can publish the translations files with:

```bash
php artisan vendor:publish --tag="filament-dynamic-actions-translations"
```


## Usage

This package simply adds a new method to the page actions that allows to disable it when the form is dirty (all parameters are optional, default values will be used if missing):

```php
    \Filament\Actions\Action::make('download')
            ->icon('heroicon-o-document-arrow-down')
            ->action(function($record){...})
             ->disabledWhenDirty(
                message: "oops! There are unsaved changes",
                disabledClass: 'disabled:opacity-100 disabled:bg-red-500',
                ignoredFields: [
                    'path.also_with_subpath.of.a.field.i_dont_care_to_check'
                ]   
             )
```

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently. [Follow Us](https://twitter.com/FabioIvona) on Twitter for more updates about this package.

## Contributing

Please see [CONTRIBUTING](.github/CONTRIBUTING.md) for details.

## Security Vulnerabilities

Please review [our security policy](../../security/policy) on how to report security vulnerabilities.

## Credits

- [Fabio Ivona](https://github.com/fabio-ivona)
- [def:studio team](https://github.com/defstudio)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
