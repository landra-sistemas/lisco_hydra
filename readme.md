# Lisco Hydra

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

