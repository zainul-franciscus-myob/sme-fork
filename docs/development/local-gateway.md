# How to set up local gateway

Sometimes it's very useful to be able to connect the local UI stack directly to gateway in integration environment.
The steps below shows how to do a port forwarding on the deployed gateway in jupiter and running local environment against it.

- Open terminal and authenticate yourself.

```
myob-auth k -e europa-preprod
```

- Run following command to port forwarding. (The loop is because connection drops after a while.)
```
bash -c 'while [ 0 ]; do kubectl port-forward svc/integration-private-api-gateway 5500:80 -n sme; done;'
```

- Connect BFF to the gateway 

```
NODE_ENV=local yarn start
```

- Connect WEB to BFF with AuthHttp.

```
REACT_APP_INTEGRATION_TYPE=AuthHttp yarn start
```

