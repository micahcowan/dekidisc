.PHONY: all build check clean watch distclean which browserify

PATH := ./node_modules/.bin:$(PATH)

SRC=src/*.ts
TSC = tsc
TSCOPT = 

all: browserify build/index.html build/sounds

build: build/dekidisc.js
build/dekidisc.js: $(SRC)
	$(TSC) $(TSCOPT) -d -t ES5 --rootDir src --outDir build $^

build/index.html:
	ln -s ../src/index.html $@
build/sounds:
	ln -s ../sounds $@

watch: $(SRC)
	$(TSC) $(TSCOPT) -w -d -t ES5 --rootDir src --outDir build $^ || true

clean:
	rm -fr build

distclean: clean
	rm -fr node_modules

browserify: build/dekidisc-all.js
build/dekidisc-all.js: build/dekidisc.js
	browserify -o $@ $<

which:
	@which $(TSC)
