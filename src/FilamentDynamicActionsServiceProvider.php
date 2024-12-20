<?php

namespace DefStudio\FilamentDynamicActions;

use Filament\Actions\Action;
use Filament\Support\Assets\Asset;
use Filament\Support\Assets\Js;
use Filament\Support\Facades\FilamentAsset;
use Filament\Support\RawJs;
use Spatie\LaravelPackageTools\Commands\InstallCommand;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class FilamentDynamicActionsServiceProvider extends PackageServiceProvider
{
    public static string $name = 'filament-dynamic-actions';

    public function configurePackage(Package $package): void
    {
        $package->name(static::$name)
            ->hasInstallCommand(function (InstallCommand $command) {
                $command->publishConfigFile()
                    ->askToStarRepoOnGitHub('defstudio/filament-dynamic-actions');
            });

        $configFileName = $package->shortName();

        if (file_exists($package->basePath("/../config/{$configFileName}.php"))) {
            $package->hasConfigFile();
        }

        if (file_exists($package->basePath('/../resources/lang'))) {
            $package->hasTranslations();
        }
    }

    public function packageRegistered(): void {}

    public function packageBooted(): void
    {
        // Asset Registration
        FilamentAsset::register(
            $this->getAssets(),
            $this->getAssetPackageName()
        );

        FilamentAsset::registerScriptData(
            $this->getScriptData(),
            $this->getAssetPackageName()
        );

        Action::macro('disabledWhenDirty', function (
            string $message = 'Sono presenti modifiche non salvate',
            string $disabled_class = 'disabled:opacity-50',
            array $ignored_fields = []
        ): self {
            /** @var Action $this */
            $this->extraAttributes([
                'class' => $disabled_class,
                'x-data' => 'disabled_when_dirty_action',
                'x-bind:disabled' => RawJs::make('changed()'),
                'x-bind:title' => RawJs::make("changed() ? '$message' : ''"),
            ], true);

            return $this;
        });
    }

    protected function getAssetPackageName(): ?string
    {
        return 'defstudio/filament-dynamic-actions';
    }

    /**
     * @return array<Asset>
     */
    protected function getAssets(): array
    {
        return [
            Js::make('filament-dynamic-actions-scripts', __DIR__ . '/../resources/dist/filament-dynamic-actions.js'),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    protected function getScriptData(): array
    {
        return [];
    }
}
