
# Atria-ERP Relational

> 📌 **Este documento también está disponible en español más abajo.**

**Atria-ERP Relational** is a project aimed at addressing the structural limitations of many current ERPs. We are not trying to compete with anyone, but rather to explore a new way of building applications.

Traditionally, when developing a management application like an ERP, a scheme based on the definition and creation of objects is usually followed:

1. Define entity-objects such as clients, invoices, products, etc., as classes or models.
2. Program the business layer within those classes or in separate layers.
3. Build a user interface with forms, buttons and views.
4. Link everything through routes, controllers and actions defined in the business logic.
5. Manage permissions and validations scattered across code layers.

This approach, based on describing behaviors through objects, remains the most common in many development environments.

With **Atria-ERP Relational**, we want to explore a model focused on **information**, not behavior. This means reversing the process: instead of defining paths to access the information, we define the information so it generates the paths.

It may seem unusual, but it’s the same logic that transformed hierarchical databases. These defined fixed routes to access data. The relational model reversed this: it defined the data and their relationships, and the routes were generated automatically.

Our project is based on this idea: to create a relational ERP model where behaviors are generated from the definition of information.

The project started as a way to optimize resources, but naturally evolved into a declarative, relational model that complies with Codd’s 13 rules **without depending on database engines**.

### Layered Architecture

To implement this model, we had to redefine the role and operation of the three layers of typical internet-based architecture: **Data**, **Business**, and **Interface**, as known in traditional development.

- The **Data layer** not only provides database information but also processes and supplies fully resolved data.
- The **Business layer** no longer contains workflows or centralized logic. It becomes a distribution layer that adapts information and structure based on declarations and requests, all at runtime instead of design time.
- The **User Interface** becomes a control and editing console, taking over functions usually handled by the ORM.

In this configuration, the layers become autonomous in their role, reducing network traffic. This autonomy allows operation without open instances or intermediate layers, optimizing resource usage.

### Paradigm Shift

The main challenge is the paradigm shift: moving from **workflows** to **relationships**. In a workflow-based design, the "client" entity is defined as an object or a property of an object. In contrast, in a relational model, the "client" condition is a **role** defined in a relationship, which emerges automatically.

The client definition, for example, is established with:
```sql
FROM Facturas F LEFT JOIN Personas P ON F.PersonaID = P.ID
```

We also replace **conditions** with **calculations**. In a traditional model, you might write:
```js
CampoR.Value = (Status === 1 ? CampoA.Value : CampoB.Value);
```

We define it declaratively as:
```
CampoR.ValueSource = Status * CampoA.Value + (1 - Status) * CampoB.Value
```

And this operation is entirely executed in the data layer.

---

# Versión en español

**Atria-ERP Relacional** es un proyecto que busca abordar las limitaciones estructurales de muchos ERP actuales. No pretendemos competir con nadie, sino explorar una nueva forma de construir aplicaciones.

Tradicionalmente, para desarrollar una aplicación de gestión como un ERP, suele seguirse un esquema basado en la definición y creación de objetos:

1. Definir entidades-objeto como clientes, facturas, productos, etc., como clases o modelos.
2. Programar la capa de negocio dentro de estas clases o en capas separadas.
3. Construir una interfaz de usuario con formularios, botones y vistas.
4. Enlazarlo todo mediante rutas, controladores y acciones definidas en la lógica de negocio.
5. Gestionar permisos y validaciones de forma dispersa dentro de las capas de código.

Este enfoque, basado en describir comportamientos mediante objetos, sigue siendo el más habitual en muchos entornos de desarrollo.

Con **Atria-ERP Relational**, queremos explorar un modelo centrado en la información, no en el comportamiento. Esto implica invertir el proceso: en lugar de definir caminos para acceder a la información, definimos la información para que genere los caminos.

Puede parecer inusual, pero es la misma lógica que transformó las bases de datos jerárquicas. Estas definían recorridos fijos para acceder a los datos. Con el modelo relacional, se invirtió el planteamiento: se definían los datos y sus relaciones, y los recorridos se generaban automáticamente.

Nuestro proyecto se basa en esta idea: crear un modelo de ERP relacional donde, a partir de la definición de la información, se generen los comportamientos.

El proyecto nació como una forma de optimizar recursos, pero evolucionó de forma natural hacia un modelo declarativo y relacional, el cual cumple las 13 reglas de Codd **sin depender de los motores de bases de datos**.

### Arquitectura en capas

Para implementar este modelo, hemos redefinido la función y el funcionamiento de las tres capas de la arquitectura de distribución por internet: **Datos**, **Negocio** e **Interfaz**, tal como se conocen en los desarrollos tradicionales.

- La capa de **Datos** no solo proporciona la información de la base de datos, sino que también la procesa y suministra todos los datos ya resueltos.
- La capa de **Negocio** deja de contener flujos de trabajo y de centralizar la lógica operacional. Se convierte en una capa de distribución que adapta la información y la estructura según las declaraciones y las peticiones, todo en tiempo de ejecución y no en tiempo de diseño.
- La **Interfaz de Usuario** se transforma en una consola de control y edición, asumiendo funciones que normalmente se delegan al ORM.

Con esta nueva configuración, las capas se vuelven autónomas en su función, reduciendo el tráfico en la red. Esta autonomía permite trabajar sin instancias abiertas ni capas intermedias, optimizando el uso de recursos.

### Cambio de paradigma

El principal desafío es el cambio de paradigma: pasar de los *workflows* a las relaciones. En un diseño basado en workflows, la entidad “cliente” se define como un objeto o como propiedad de un objeto. En cambio, en un modelo relacional, la condición de “cliente” es un **rol** definido en una relación, que emerge de forma automática.

La definición de cliente se establece, por ejemplo, con:
```sql
FROM Facturas F LEFT JOIN Personas P ON F.PersonaID = P.ID
```

También cambiamos el uso de **condiciones** por **cálculos**. En un modelo tradicional, escribiríamos en la capa de negocio:
```js
CampoR.Valor = (Estatus === 1 ? CampoA.Valor : CampoB.Valor);
```

Nosotros lo definimos como una propiedad declarativa:
```
CampoR.OrigenValor = Estatus * CampoA.Valor + (1 - Estatus) * CampoB.Valor
```

Y esta operación se ejecuta íntegramente en la capa de datos.
