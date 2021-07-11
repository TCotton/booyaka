import {StrykerOptions} from '@stryker-mutator/api/core';
import {Logger} from '@stryker-mutator/api/logging';
import {commonTokens, PluginContext} from '@stryker-mutator/api/plugin';
import {
    DryRunOptions,
    DryRunResult,
    MutantRunOptions,
    MutantRunResult,
    TestRunner
} from '@stryker-mutator/api/test-runner';
import * as pluginTokens from './plugin-tokens';
import FooTestRunnerConfigFileLoader from './foo-test-runner-config-file-loader';
import {Injector} from "typed-inject";

export class FooTestRunner implements TestRunner {
    public static inject = [
        commonTokens.logger,
        commonTokens.options,
        pluginTokens.configLoader,
        pluginTokens.processEnv,
        pluginTokens.fooTestRunnerVersion
    ] as const;

    constructor(
        private readonly log: Logger,
        private readonly options: StrykerOptions,
        private readonly configLoader: FooTestRunnerConfigFileLoader,
        private readonly processEnvRef: NodeJS.ProcessEnv,
        private readonly fooTestRunnerVersion: string
    ) {
    }

    public init(): Promise<void> {
        // TODO: Implement or remove
    }

    public dryRun(options: DryRunOptions): Promise<DryRunResult> {
        // TODO: Implement
    }

    public mutantRun(options: MutantRunOptions): Promise<MutantRunResult> {
        // TODO: Implement
    }

    public dispose(): Promise<void> {
        // TODO: Implement or remove
    }
}

export function fooTestRunnerFactory(injector: Injector<PluginContext>) {
    return injector
        .provideValue(pluginTokens.processEnv, process.env)
        .provideValue(pluginTokens.fooTestRunnerVersion, require('foo/package.json').version as string)
        .provideClass(pluginTokens.configLoader, FooTestRunnerConfigFileLoader)
        .injectClass(FooTestRunner);
}

fooTestRunnerFactory.inject = [commonTokens.injector] as const;