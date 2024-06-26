// src/tests/setupTests.js
// This file can include global mocks or other configurations needed before running your Vue tests.
import { config } from '@vue/test-utils';

config.global.mocks = {
    // Mock global properties here if necessary
};

// Example: Mocking a global mixin or Vue prototype modification if needed
// config.global.plugins = [...];
