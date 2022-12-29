# Lisco Hydra
![npm](https://img.shields.io/npm/v/@landra_sistemas/lisco_hydra?label=version)
![GitHub](https://img.shields.io/github/license/landra-sistemas/lisco_hydra)

![alt](./logo.png)

Módulo de gestión de microservicios basado en [Hydra](https://www.hydramicroservice.com/) para [lisco](https://github.com/landra-sistemas/lisco).


 Lisco es un framework basado en express el cual, de forma nativa, no dispone de la capacidad de escalar horizontalmente en diferentes nodos. Dispone del sistema de cluster de nodejs pero esto solo permite aumentar la cantidad de procesos activos en el mismo nodo. 

 Para aportar esta característica nace Lisco Hydra. Este módulo sobreescribe el comportamiento base de Lisco incluyendo Hydra de forma que la aplicación creada pueda beneficiarse de todas las características de los microservicios tales como:
 
 - Autodiscovery
 - Service Scalability
 - Distributed Messaging
 - Load balancing
 - Health Monitoring
 - Hydra Router
 - Hydra CLI    
 - Para más información visita [Hydra](https://www.hydramicroservice.com/)



Hydra utiliza [redis](https://redis.io) como motor de almacenamiento de datos centralizado. La información de los microservicios, rutas y comunicaciones pasa por el.


## Quick Start

El módulo puede añadirse a cualquier instalación existente de lisco. Únicamente es necesario:

``` bash
> npm install @landra_sistemas/lisco_hydra
```

Una vez instalado el módulo, su uso es sencillo:

``` diff
import { App } from '@landra_sistemas/lisco'
+import { HydraServer, HydraClusterServer } from "../src/index.mjs";

//La implementación de esto puede variar 
module.exports = () => { 
    //Al inicio de la funcion de arranque
+    App.clusterClass = HydraClusterServer;
+    App.serverClass = HydraServer;

    [...]

-    await App.init();
+    await App.init({
+           socketio: false,
+           traceRequests: true,
+           hydra: {
+               serviceName: "[Name]",
+               serviceDescription: "[Description]",
+               serviceIP: "",
+               servicePort: 0, //Random port for better scalability
+               serviceType: "express",
+               serviceVersion: "[version]",
+               redis: {
+                   url: "redis://default:redispw@localhost:56563",
+               },
+           },
+       });

-   App.start();
+   await App.start();

+   console.log(`Started "${App.hydra.getServiceName()}" (v.${App.hydra.+ getInstanceVersion()})`);

}

```

Mediante estas modificaciones se sobreescribe el comportamiento de forma que Hydra controle el arranque del mismo.


### Instalar redis

Hydra necesita redis para la gestión de los nodos y su intercomunicación. Para esto se puede usar docker:

``` bash
> docker run --name some-redis -d redis
```

Ver mas info sobre formas de instalarlo **[Aquí](https://www.hydramicroservice.com/docs/quick-start/step1.html)**

### Hydra CLI

La herramienta de comandos Hydra CLI se puede usar para interactuar con el sistema. Para ello se debe instalar:

``` bash
> npm install -g hydra-cli
```

Una vez instalada es necesario realizar la configuración de la herramienta para conectarla con el servidor de redis:

``` bash
> hydra-cli config
redisUrl: 127.0.0.1
redisPort: 6379
redisDb: 15
```

### Hydra Router

Mediante el Router se pueden redirigir, sin necesidad de implementar un gateway, mensajes entre los diferentes servicios conectados. Dispone también de una interfaz sencilla para la visualización de los servicios activos.

Para instalarlo es **necesario docker**.

``` bash
> docker run -d -p 5353:5353 --add-host host:10.1.1.175 --name hydra-router flywheelsports/hydra-router:1.3.3
```

Una vez instalado, el dashboard es accesible de la siguiente forma:

```
http://localhost:5353/
```

Se puede consultar mas información sobre cómo utilizar las herramientas del router **[Aquí](https://www.hydramicroservice.com/docs/tools/hydra-router/introduction.html)**


## Uso

El uso del módulo dependerá en gran medida de la estrategia usada y la arquitectura elegida. Hydra puede gestionar la comunicación entre nodos de forma que los microservicios puedan comunicarse entre sí.


### API Gateway

Una posibilidad podría ser utilizar un servicio Gateway encargado de publicar la API cliente que se servirá a los usuarios y que consumirá el resto de microservicios.

`TODO crear ejemplos`

### Dezentralized 

Otra posibilidad podría ser utilizar el sistema de mensajería de Hydra para que los microservicios puedan comunicarse entre sí. Creando un servicio para la presentación de la vista al usuario.

`TODO crear ejemplos`



## Arquitectura

La elección de la arquitectura dependerá de las necesidades. En esta web se puede encontrar mucha información al respecto y estrategias tanto de división como de implementación: [Microservicios](https://microservices.io/patterns/microservices.html)



## Plugins interesantes

Hydra dispone de un sistema de plugins registrables "at runtime" para extender su comportamiento. Durante las pruebas se han encontrado una serie de plugins que pueden ser registrados y aportar funcionalidades interesantes:

- https://github.com/jkyberneees/hydra-plugin-http - Plugin para simplificar la creación de gateways de forma que centralice las llamadas API a los diferentes servicios conectados.
- https://github.com/pnxtech/hydra-plugin-hls - Logger para centralizar los logs en HLS (Hydra Logging Service). 


## Ayuda

En el siguiente repo existe un tutorial creado por el desarrollador principal del sistema:

- https://github.com/cjus/hydra-tutorial

En el se puede encontrar los pasos para iniciar redis, hydra-router y crear varios servicios que hablen entre si.