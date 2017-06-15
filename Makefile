export CLOUDFLARE_ZONE = 26476990dab8ae7a34671a7483c225a8

run:
	./serve.go src

deploy: clean build push cdn

clean:
	rm -fR build

build: clean
	mkdir -p build
	cp -r src/* build/
	sed "s/{time}/$$(date +%s)/g" <src/index.html >build/index.html

push: build
	gsutil -m cp -a public-read -r build/* gs://base64.xyz
	gsutil web set -m index.html gs://base64.xyz

cdn:
	curl -X DELETE "https://api.cloudflare.com/client/v4/zones/$(CLOUDFLARE_ZONE)/purge_cache" \
		-H "X-Auth-Email: $(CLOUDFLARE_EMAIL)" \
		-H "X-Auth-Key: $(CLOUDFLARE_CLIENT_API_KEY)" \
		-H "Content-Type: application/json" \
		--data '{"purge_everything":true}'
