http-livereload
==========

CLI wrapper for starting a http server with integrated LiveReload and file change watcher / notifier.

Usage
-----
Run `http-livereload` without arguments for options.

Example
-----
```
http-livereload ./www --watch-dir ./src --watch-cmd='make reload' --cordova
```

Serve `www` on `localhost:3000` with _Cordova_ device stub and watch for changes in `src`.
Executes `make reload` on changes.

License
-------
Released under permissive MIT License.
