.PHONY: all build check clean watch distclean which browserify

PATH := ./node_modules/.bin:$(PATH)

SRC=src/*.ts
TSC = ./node_modules/.bin/tsc
TSCOPT = -d -t ES5 --sourceMap --noImplicitAny
BIFY = ./node_modules/.bin/browserify -d

all: browserify build/index.html build/sounds

build: build/dekidisc.js
build/dekidisc.js: $(SRC)
	$(TSC) $(TSCOPT) --rootDir src --outDir build $^

build/index.html:
	ln -s ../src/index.html $@
build/sounds:
	ln -s ../sounds $@

watch: $(SRC)
	$(TSC) $(TSCOPT) -w --rootDir src --outDir build $^ || true

clean:
	rm -fr build

distclean: clean
	rm -fr node_modules

browserify: build/dekidisc-all.js
build/dekidisc-all.js: build/dekidisc.js
	$(BIFY) -o $@ $<

which:
	@which $(TSC)

