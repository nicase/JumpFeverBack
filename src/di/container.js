const {
  createContainer,
  InjectionMode,
  Lifetime,
  asClass,
  asFunction,
  asValue,
} = require('awilix');

// =============================================================================
// Awilix Container
// =============================================================================

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

// =============================================================================
// Application - Use Cases
// =============================================================================

container.loadModules([
  'src/app/useCases/**/*.js',
], {
  resolverOptions: {
    lifetime: Lifetime.TRANSIENT,
    register: asClass,
  },
});

// =============================================================================
// Infrastructure
// =============================================================================

const config = require('../infra/config');
const mongoose = require('../infra/mongoose');
const logger = require('../infra/logging/winston');

container.register({
  config: asValue(config),
});

container.register({
  mongoose: asValue(mongoose),
});

container.register({
  logger: asFunction(logger).singleton(),
});

// =============================================================================
// Services
// =============================================================================

container.loadModules([
  'src/services/*Service/*Service.js',
], {
  resolverOptions: {
    lifetime: Lifetime.SINGLETON,
    register: asClass,
  },
  formatName: 'camelCase',
});

// =============================================================================
// Interfaces - Express
// =============================================================================

const express = require('../ui/express/ExpressServer');

container.register({
  awilixContainer: asValue(container),
});

container.register({
  express: asClass(express).singleton(),
});

// =============================================================================
// Module export
// =============================================================================

module.exports = container;
