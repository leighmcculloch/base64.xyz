run: clean build
	wrangler pages dev ./build

clean:
	rm -fR build

build: clean
	mkdir -p build
	cp -r src/* build/
	sed "s/{time}/$$(date +%s)/g" <src/index.html >build/index.html

deploy: clean build
	wrangler pages deploy --project-name base64-xyz .
