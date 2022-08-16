<?php

function onlyForDevelopment(): bool
{
    return in_array(config('app.env'), ['local', 'development'], true);
}
