<?php

function print_query($query)
{
    $q = vsprintf(str_replace('?', "'%s'", $query->toSql()), $query->getBindings());
    dd($q);
}
